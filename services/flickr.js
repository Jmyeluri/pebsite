import axios from 'axios'

const baseUrl = 'https://www.flickr.com/services/rest/'
const userIdApiKeyParams = `api_key=${process.env.FLICKR_API_KEY}&user_id=${process.env.FLICKR_USER_ID}`

const getMyPublicPhotos = () => {
  const publicPhotosParams = `?method=flickr.people.getPublicPhotos&${userIdApiKeyParams}&format=json&nojsoncallback=1`
  return axios.get(baseUrl + publicPhotosParams).then(resp => {
    if (resp.data.stat === "ok") {
      return resp.data.photos.photo
    } else {
      return []
    }
  })
}

const getMyPhotoSets = async () => {
  const myPhotoSetParams = `?method=flickr.photosets.getList&${userIdApiKeyParams}&format=json`
  return axios.get(baseUrl + myPhotoSetParams)
}

const getPhotosFromPhotoSet = async (photoSetId) => {
  const photoSetInfoParams = `?method=flickr.photosets.getPhotos&photoset_id=${photoSetId}&${userIdApiKeyParams}&format=json`
  return axios.get(baseUrl + photoSetInfoParams)
}

const getPhotosFromAlbumName = async (albumName) => {
  const photoSets = await getMyPhotoSets().then(resp => {
      return parseJsonData(resp.data).photosets.photoset.map(photoset => {
        return {
          "psId": photoset.id,
          "name": photoset.title._content
        }
      }).filter(photoSet => photoSet.name === albumName)
  })
  return Promise.all(photoSets.map(async (photoSet) => {
    return {
      "photoSet": photoSet,
      "photos": parseJsonData(await getPhotosFromPhotoSet(photoSet.psId).then(resp => resp.data)).photoset.photo
    }
  }))
}

const getMyPhotosFromPhotoSets = async () => {
  const photoSets = await getMyPhotoSets().then(resp => {
      return parseJsonData(resp.data).photosets.photoset.map(photoset => {
        return {
          "psId": photoset.id,
          "name": photoset.title._content
        }
      })
  })
  return Promise.all(photoSets.map(async (photoSet) => {
    return {
      "photoSet": photoSet,
      "photos": parseJsonData(await getPhotosFromPhotoSet(photoSet.psId).then(resp => resp.data)).photoset.photo
    }
  }))
}

const parseJsonData = (jsonStr) => {
  const match = jsonStr.match(/jsonFlickrApi\((.*?)\)/)
  return JSON.parse(match[1])
}

export default { getMyPublicPhotos, getMyPhotosFromPhotoSets, getPhotosFromAlbumName }
