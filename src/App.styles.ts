import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/react-trivia-bg.jpg";
//ts-ignore

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 50px;
        display: flex;
        justify-content: center
    }
    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  .error {
    color: #ffd5d5;
    font-size: 1rem;
    margin: 0 0 20px;
    text-align: center;
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .results h2 {
    color: #fff;
    margin: 0 0 10px;
  }

  h1 {
    font-family: Fascinate Inline;
    background: linear-gradient(180deg, #fff, #87f1ff);
    color: #deed37;
    font-weight: 600;
    background-size: 100%;
    background-clip: text;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
    margin: 0 auto;
  }
`;
