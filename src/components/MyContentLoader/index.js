import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width='auto'
    height='auto'
    backgroundColor="#f2f2f2"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect rx="20" ry="20" width='100%' height='100%' />
  </ContentLoader>
)

export default MyLoader