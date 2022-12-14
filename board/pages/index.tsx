import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
  return (
    <HomeBlock>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        <h1>Next.js + Typescript</h1>
      </div>
    </HomeBlock>
  )
}

const HomeBlock = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
