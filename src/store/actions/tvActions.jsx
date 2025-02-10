export {removetv} from '../reducers/tvSlice'
import axios from '../../utils/axios'
import { loadtv } from '../reducers/tvSlice'



export const asyncLoadtv = (id) => async (dispatch,getState) => {

    try {

    const detail = await axios.get(`/tv/${id}`)
    const externalid = await axios.get(`/tv/${id}/external_ids`)
    const recomendation = await axios.get(`/tv/${id}/recommendations`)
    const similar = await axios.get(`/tv/${id}/similar`)
     const videos = await axios.get(`/tv/${id}/videos`)
    // const watchprovider = await axios.get(`/tv/${id}/watch/providers`)
    const translation= await axios.get(`/tv/${id}/translations`)
   

    let bigdata = {
        detail:detail.data,
        externalid:externalid.data,
        recomendation:recomendation.data.results,
        similar:similar.data.results,
         videos:videos.data.results.find(m=>m.type==="Trailer"),
        // watchprovider: watchprovider.data.results.IN,
        translation:translation.data.translations.map(n=>n.english_name)

    }
     
    dispatch(loadtv(bigdata))
    console.log(bigdata)


        
    } catch (error) {

        console.log(error)
        
    }




}