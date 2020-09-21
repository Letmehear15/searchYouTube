import axios from 'axios';

const key = 'AIzaSyClgYbRV8fIz9CXl0NmvR6Phry-JmALpWA';
const getVideoURL =  `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video`;
const getUsersUrl = `http://localhost:3001/users`
const getFavoritesUrl = `http://localhost:3001/favorites`

export const getVideoApi = {
    getVideo(textOfSearch:string, maxSize=12) {
        return axios.get<any>(`${getVideoURL}&q=${textOfSearch}&maxResults=${maxSize}`)
    }
}

type GetUsersType = {
    id: string
    password: string
    login: string
}
export type FavoriteType = {
    id: string 
    userId: string
    text: string 
}
export const getUserAuth = {
    getAuth() {
        return axios.get<Array<GetUsersType>>(getUsersUrl)
    }
}

export const getFavoriteApi = {
    addFavorite(userId:string|null, id:string|null, text:string|null) {
        return axios.post<FavoriteType>(getFavoritesUrl,{userId,id, text}).then(res=>res.data)
    },
    getFavorite() {
        return axios.get<Array<FavoriteType>>(getFavoritesUrl)
    },
    deleteFavorite(id:string) {
        return axios.delete(`${getFavoritesUrl}/${id}`)
    },
    editFavorite(text:string,id:string,userId:string|null){
        return axios.put<Array<FavoriteType>>(getFavoritesUrl+`/${id}`, {text,userId}).then(res=>res.data)
    }
}

