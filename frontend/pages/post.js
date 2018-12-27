import Post from '../components/Post'
import Wrapper from '../components/Wrapper'

export default props => (
  <Wrapper>
    <Post id={props.query.id} />
  </Wrapper>
)
