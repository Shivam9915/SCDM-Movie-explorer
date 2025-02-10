export {removemovie} from '../reducers/movieSlice'
import axios from '../../utils/axios'
import { loadmovie } from '../reducers/movieSlice'



export const asyncLoadmovie = (id) => async (dispatch,getState) => {
    try {

    const detail = await axios.get(`/movie/${id}`)
    const externalid = await axios.get(`/movie/${id}/external_ids`)
    const recomendation = await axios.get(`/movie/${id}/recommendations`)
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`)
    const translation= await axios.get((`/movie/${id}/translations`))
   

    let bigdata = {
        detail:detail.data,
        externalid:externalid.data,
        recomendation:recomendation.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find(m=>m.type==="Trailer"),
        watchprovider: watchprovider.data.results.IN,
        translation:translation.data.translations.map(n=>n.english_name)

    }
     
    dispatch(loadmovie(bigdata))
    console.log(bigdata)


        
    } catch (error) {

        console.log(error)
        
    }




}