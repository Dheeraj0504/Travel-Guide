import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TravelGuidePackages from '../TravelGuidePackages'
import {
  TravelGuideContainer,
  MainHeading,
  TravelGuideList,
  LoaderContainer,
} from './styledComponents'

class TravelGuidePage extends Component {
  state = {
    isLoading: false,
    travelPackageList: [],
  }

  componentDidMount() {
    this.getTravelPackagesList()
  }

  getTravelPackagesList = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      const updatedData = data.packages.map(eachPackage => ({
        name: eachPackage.name,
        id: eachPackage.id,
        description: eachPackage.description,
        imageUrl: eachPackage.image_url,
      }))

      this.setState({
        travelPackageList: updatedData,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderTravelPackages = () => {
    const {travelPackageList} = this.state
    return (
      <TravelGuideList>
        {travelPackageList.map(each => (
          <TravelGuidePackages key={each.id} TravelPackageItemDetails={each} />
        ))}
      </TravelGuideList>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <TravelGuideContainer>
        <MainHeading>Travel Guide</MainHeading>
        {isLoading ? this.renderLoader() : this.renderTravelPackages()}
      </TravelGuideContainer>
    )
  }
}
export default TravelGuidePage
