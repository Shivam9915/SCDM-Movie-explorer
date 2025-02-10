import axios from "axios"

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODUyNmRhOTI3MzU2NjFmOWZlMDgzMjQwMWRkYzAxYyIsIm5iZiI6MTczMTIxMjE4OS4yMTk3Njg1LCJzdWIiOiI2NzJlMGU5ZGE4MTg3MTNiZGY0OTQ5MDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bpxGLCGCEWvHstLZPx-gVgLXoG1Znk1wnvu7-ujcUhU'
      }
})
export default instance