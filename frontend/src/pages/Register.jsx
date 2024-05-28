import { styled } from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100vw;
  background-color: #fff;
`

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  border-radius: 20px;
`

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
`

const ImageContainer = styled.div`
  width: 80%;
  text-align: center;
`

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px;
  color: black;
  box-sizing: border-box;
  background-color: #d9d9d9;
  border-radius: 10px; //adjust once design is done

  &:focus {
    background-color: #fff;
    border: 1px solid black;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #88a183;
  border: none;
  border-radius: 20px; //adjust once design is done
  color: black; //  white or black?
  cursor: pointer;
  &:hover {
    background-color: #88a183b7;
  }
`

const BottomText = styled.div`
  margin-top: 20px;
  font-size: 0.6em;
  color: black;
  p {
    text-align: center;
    margin: 5px 0;
  }
  a {
    color: black;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      //some effects
    }
  }
`
export const Register = () => {
  return (
    <Container>
      <LeftColumn>
        <ImageContainer>
          <StyledImage src="world.png" alt="World" />
        </ImageContainer>
      </LeftColumn>
      <RightColumn>
        <FormContainer>
          <h2>Register</h2>
          <form>
            <FormGroup>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </FormGroup>
            <Button type="submit">Sign up</Button>
          </form>
          <BottomText>
            <p>
              Do you already have an account? <a href="#">Sign in</a>
            </p>
            <p>By clicking the button above, you agree to Terms and Privacy</p>
          </BottomText>
        </FormContainer>
      </RightColumn>
    </Container>
  )
}
