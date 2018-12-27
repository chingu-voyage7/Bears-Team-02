import Review from '../components/Review'
import Wrapper from '../components/Wrapper'

export default props => (
  <Wrapper>
    <Review id={props.query.id} />
  </Wrapper>
)
