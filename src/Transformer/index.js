import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import styled, { css }  from 'styled-components'
import CodeEditor from '../RestClient/CodeEditor'

import axios from 'axios'
import chroma from 'chroma-js'
import moment from 'moment'
import ReactJson from 'react-json-view'

import JSONEditor from '../JSONEditor'

const Container = styled.div`
    min-width: 720px;
    /* min-height: 720px; */

    background: white;
    border-radius: 4px;
    /* padding: 20px; */

    & > div:first-child {

        display: flex;
        justify-content: flex-start;
        align-items: center;


        border-bottom: 1px solid #f5f5f5;
        background: #fbfbfb;
        border-radius: 4px;
        padding-left: 15px;
    }

    & h5 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px;
        /* margin-top: 25px; */
        font-size: 20px;
        color: #c7c7c7;
        FONT-WEIGHT: 500;
    }

    & h5 svg {
        padding-right: 5px;
        padding-top: 3px;

        path {
            fill: #c7c7c7;
        }
    }


    .gray {
        background: #f3f3f3;
        padding: 10px;
        border-radius: 5px;
        margin-top: 20px;
        height: 100%;
        
        background: var(--element-color);
        border: 1px solid var(--element-border-color);
    }


    & * {
        box-sizing: border-box;
        color: #1c2b46;
    }


`


const Body = styled.div`

    display: flex;
    flex-flow: row;
    align-items: stretch;



`


const BodyGrid = styled.div`
    display: grid!important;
    height: calc(100% - 66px);
    width: 100%;
    grid-template-rows: minmax(200px, 1fr) 100px;
    grid-template-columns: minmax(400px, 1fr) 100px minmax(400px, 1fr);

`


const SectionGridLeft = styled.section`
    display: flex;
    flex-flow: column;
    position: relative;
    justify-content: space-between;


    grid-column: 1/2;
    grid-row: 1/2;



    /* margin: 0 20px; */
    padding:20px;

    & > div > div > div {
        min-height: 500px;
        width: 100%;


    }

`

const SectionGridRight = styled.section`
    display: flex;
    flex-flow: column;
    position: relative;
    justify-content: space-between;


    grid-column: 3/4;
    grid-row: 1/2;





    & > div > div > div {
        height: calc(100% - 20px);
        width: 100%;


    }

    /* margin: 0 20px; */
    padding:20px;

    & input::first-child {
        margin-top: 0;
    }
`



const SectionGridBottom = styled.section`
    display: flex;
    flex-flow: column;
    position: relative;
    justify-content: space-between;


    grid-column: 1/4;
    grid-row: 2/3;



    margin: 0 20px;
    padding:20px;

    & input::first-child {
        margin-top: 0;
    }
`


const SectionGridLine = styled.div`
    height: 80%;
    border-left: 1px solid #f3f3f3;
    border-right: 1px solid #f3f3f3;
    /* background: #f3f3f3;
     */
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: center;
    justify-self: center;
`



const colorPalett = (color, tc="white") => {
    return css`
        background: ${color};
        color: ${tc}!important;

        &:hover {
            background: ${chroma(color).darken(0.1).hex()};
        }


        & path {
            fill: ${tc}!important;
        }



        & > svg, & > svg > path {
            color: ${tc}!important;
        }
    
    `
}

const ButtonWrapper = styled.button`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 10px;
  user-select: none;
  align-items: center;
  color: #a0a0a0;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    border-width: 1px 1px 1px 1px;


  ${'' /* border-bottom: 4px solid ${chroma("#2196f3").darken(0.6).hex()}; */}

   &:hover {
     background: ${chroma("#2196f3").darken(0.2).hex()};
   }


   



  border-radius: 4px;


    color: rgb(255 255 255);
    color: white!important;
    font-weight: 500;
    background: #217fa5;
    background: #ff7070;
    background: #ffc107;
    background: #03a9f4;

    padding: 10px 15px 10px 10px;


    font-weight: 400;
    background: #efefef;
    color: #888888!important;

    padding: 10px 12px;
    margin-right: 10px;

    &:hover {
     background: ${chroma("#efefef").darken(0.2).hex()};
   }

   border: none;

   background: var(--element-color);
   border: 1px solid var(--element-border-color);

   ${props => props.danger && colorPalett("#ff5050", "white")}


    & > svg {
      width: 20px;
      height: 17px;

      path {
        fill: #888888!important;
      }
  }


  & > svg, & > svg > path {
      color: white!important;
  }
`;



const InputWrapper = styled.input`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
    text-rendering: optimizeLegibility;
    

    height: 34px;
    outline: none;
    background-color: #f9f9f9;
    background: #fdfdfd;
    /* border: 1px solid #f1f1f1; */
    border-color: #d4d4d4;
    border: none;
    padding: 2px 10px;
    position: relative;
    left: 0;
    width: 300px;

    color: #81858e;
    color: #4c5058;
    cursor: pointer;
    display: inline-block;
    box-sizing: content-box;
    vertical-align: bottom;

    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    /* &:hover,
    &:focus {
    /* border-color: #4dacff; */
    /* color: #4dacff; */
    /* box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05); */
    /* } */


    &::placeholder {
        color: rgba(160, 160, 160, 0.6);
        color: #a9a9a9;
        font-weight: ${props => props.placeholderWeight ? props.placeholderWeight : 400};
    }

    border-radius: 4px;
    margin: 5px 0px 5px 0px;
    background: #ececec;
    background: #f3f3f3;
    padding: 2px 18px;

 
`



const Section = styled.section`
    display: flex;

    /* align-items: center; */
    flex-flow: column;
position: relative;
    justify-content: space-between;


    width: 50%;

    min-height: 357px;

    & > div > div > div {
        min-height: 250px;
        min-width: 310px;
    }

    margin: 0 20px;
    padding:20px;

    & input::first-child {
        margin-top: 0;
    }


    


`


const Row = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    align-self: ${props => props.end ? "flex-end" : props.center ? "center" : "unset"};

    & > label {
        font-size: 12px;
        /* align-self: flex-start; */
    }

    & > h4 {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 10px 0;
        color: #1c2b46;
    }
`



const Column = styled.div`
    display: flex;
    flex-flow: ${props => props.horizontal ? "row" : "column"};



    & > label {
        font-size: 12px;
        /* align-self: flex-start; */
    }

    & > h4 {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 10px 0;
        color: #1c2b46;
    }
`


const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    transition: transform 0.2s;


    & > label {
        font-size: 12px;
        color: #808080;
        /* align-self: flex-start; */
        z-index: 1;
        pointer-events: none;
        transform: ${props => `translate(10px, 10px)` || `translate(${props.hasFocus ? 10 : 30}px, ${props.hasFocus ? 10 : 30}px)`};
    }



 

   
`





const WizardContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 10px 0px;
    margin: 0;
    margin-bottom: 20px;
    margin-top: 20px;

`


const Line = styled.div`
    width: 100%;
    height: 2px;
    background: #efefef;
    margin: 10px 0px;


    &::after {
        content: "";
        display: block;
        height: 2px;
        position: absolute; 
        /* top: 0; */
        left: 0;
        width: ${props => false && props.process + "%"};
        background: #6FC6FE;

    }
`

const CircleContainer = styled.div`
    width: calc(100% - 40px);
    position: absolute;
    top: -2px;
`
const Circle = styled.div`
    position: absolute;
    background: #efefef;
    border: 5px solid white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s, transform 0.12s;
    transform: scale(1);
    color: white;

    &:hover {
        transform: scale(1.05);
        background: #e3e3e3;
    }

    ${props => css`
        left: ${(props.index * 100) === 0 ? "0%" : `calc(${((props.index * 100) /(props.list.length - 1))}% ${props.list.length - 1 === props.index ? "- 44px" : "- 22px"})`};
    `}

    & path {
        fill: white;
    }

    ${props => props.active && false && css`
        background: #6FC6FE;
        color: white;

        &:hover {
            transform: scale(1.05);
            background: #6FC6FE;
        }
    `}

`
const CircleText = styled.div`
    position: absolute; 
    top: calc(100% + 10px);
    margin: auto;
    font-size: 12px;
    text-align: center;
    width: 90px;
    color: #B2B2B2;

`

function DBIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M10.75 6.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zM6 7.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 7.25zm4 9a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm-3.25-.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path><path fill-rule="evenodd" d="M3.25 2A1.75 1.75 0 001.5 3.75v7c0 .372.116.716.314 1a1.742 1.742 0 00-.314 1v7c0 .966.784 1.75 1.75 1.75h17.5a1.75 1.75 0 001.75-1.75v-7c0-.372-.116-.716-.314-1 .198-.284.314-.628.314-1v-7A1.75 1.75 0 0020.75 2H3.25zm0 9h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25H3.25a.25.25 0 00-.25.25v7c0 .138.112.25.25.25zm0 1.5a.25.25 0 00-.25.25v7c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25H3.25z"></path></svg>
    )
}


function FormIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg>
    )
}


function SuccessIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6z"></path><path fill-rule="evenodd" d="M14.136 1.2a3.61 3.61 0 00-4.272 0L8.489 2.21a2.11 2.11 0 01-.929.384l-1.686.259a3.61 3.61 0 00-3.021 3.02L2.594 7.56a2.11 2.11 0 01-.384.929L1.2 9.864a3.61 3.61 0 000 4.272l1.01 1.375c.2.274.333.593.384.929l.259 1.686a3.61 3.61 0 003.02 3.021l1.687.259c.336.051.655.183.929.384l1.375 1.01a3.61 3.61 0 004.272 0l1.375-1.01a2.11 2.11 0 01.929-.384l1.686-.259a3.61 3.61 0 003.021-3.02l.259-1.687a2.11 2.11 0 01.384-.929l1.01-1.375a3.61 3.61 0 000-4.272l-1.01-1.375a2.11 2.11 0 01-.384-.929l-.259-1.686a3.61 3.61 0 00-3.02-3.021l-1.687-.259a2.11 2.11 0 01-.929-.384L14.136 1.2zm-3.384 1.209a2.11 2.11 0 012.496 0l1.376 1.01a3.61 3.61 0 001.589.658l1.686.258a2.11 2.11 0 011.765 1.766l.26 1.686a3.61 3.61 0 00.657 1.59l1.01 1.375a2.11 2.11 0 010 2.496l-1.01 1.376a3.61 3.61 0 00-.658 1.589l-.258 1.686a2.11 2.11 0 01-1.766 1.765l-1.686.26a3.61 3.61 0 00-1.59.657l-1.375 1.01a2.11 2.11 0 01-2.496 0l-1.376-1.01a3.61 3.61 0 00-1.589-.658l-1.686-.258a2.11 2.11 0 01-1.766-1.766l-.258-1.686a3.61 3.61 0 00-.658-1.59l-1.01-1.375a2.11 2.11 0 010-2.496l1.01-1.376a3.61 3.61 0 00.658-1.589l.258-1.686a2.11 2.11 0 011.766-1.766l1.686-.258a3.61 3.61 0 001.59-.658l1.375-1.01z"></path></svg>
    )
}



function InputField(props) {
    const [state, setState] = useState({ focus: false })
    const { placeholder, ...restProps} = props


    return (
        <Wrapper hasFocus={state.focus}>
            <label htmlFor="">{placeholder}</label>
            <InputWrapper onFocus={e => setState(prev => ({...prev, focus: true}))} onBlur={e => setState(prev => ({...prev, focus: false}))} {...restProps}/>
        </Wrapper>
    )
}

function Transformer(props) {
    const [state, setState] = React.useState(() => props.value || { body: ""})
    
    const register = () => {}
    const unregister = () => {}

    const setValue = useCallback((name, value) => {
      setState(prev => ({ ...prev, [name]: value }))
    },[])

    const watch = (name, defaultVal) => {
      return state[name] || defaultVal
    }

    const amount = Math.round(Math.random() * 100)

    return (
        <Container>
            <div>
                <h5>Omvandlare</h5>
            </div>


            <BodyGrid>
                <SectionGridLeft>
                    <Row className="gray"> 
                        {/* <CodeEditor key={"body"} name="body"  active={true} lang="javascript" register={register} setValue={setValue} unregister={unregister} watch={watch} /> */}

                        <ReactJson src={{
                            hello: { jon: { wick : 10, dog: 0}, help: "hello", date: new Date(), milli: Date.now()}
                        }}/>
                    </Row>
                </SectionGridLeft>

                <SectionGridLine>

                    <ButtonWrapper style={{marginBottom: 20}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z"></path></svg>
                    </ButtonWrapper>

                    <ButtonWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" fill="currentColor" d="M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"></path></svg>
                    </ButtonWrapper>
                    
                </SectionGridLine>

                <SectionGridRight>
                    <Row className="gray"> 
                        <JSONEditor key={"body"} name="body"  active={true} lang="javascript" register={register} setValue={setValue} unregister={unregister} watch={watch} />
                    </Row>
                </SectionGridRight>

                <SectionGridBottom>
                    <Row end>
                        <Column horizontal>
                            <ButtonWrapper>Spara</ButtonWrapper>
                            <ButtonWrapper danger onClick={props.toggleTransformer}>Avbryt</ButtonWrapper>
                        </Column>
                    </Row>
                </SectionGridBottom>
            </BodyGrid>
          
        </Container>

    )

}


export default Transformer