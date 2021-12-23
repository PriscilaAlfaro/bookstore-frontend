import styled from 'styled-components/macro';


const HeaderBodyContainer = styled.section`
  color: white;
  display: flex;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  display: flex;
`

const RightContainer = styled.div`
  display: flex;
`

const ButtonHeader = styled.button`
  color: white;
  background: rgb(186, 201, 100);
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const HeaderIcons = ({handleOnClickSearch}) => {

    return (
            <HeaderBodyContainer>
                <LeftContainer>
                    <ButtonHeader onClick={handleOnClickSearch}><i className="fas fa-search"></i> search</ButtonHeader>
                </LeftContainer>
                <RightContainer>
                    <ButtonHeader ><i className="fas fa-user-circle"></i> </ButtonHeader>
                    <ButtonHeader ><i className="fas fa-heart"></i></ButtonHeader>
                    <ButtonHeader ><i className="fas fa-shopping-cart"></i> $0</ButtonHeader>
                </RightContainer>
            </HeaderBodyContainer>
    )
}

export default HeaderIcons;