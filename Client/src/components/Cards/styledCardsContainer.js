import styled from "styled-components"

const StyledCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-items: center;
    margin: 10px 50px 100px 50px;
    padding: 20px;
`

export default StyledCardsContainer