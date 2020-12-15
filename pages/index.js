import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import GitHub from '../components/Icons/GitHub'
import { loginWithGitHub } from '../firebase/client'
import { colors } from '../styles/theme'


export default function Home() {

  const handleClick = () => {
    loginWithGitHub()
    .then(user => console.log(user))
    .catch(err => console.log(err))
  }
  return (
    <>
      <Head>
        <title>Devver</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="devver" />
          <h1>Devver</h1>
          <h2>Talk about development <br /> with developers</h2>
          <div>
            <Button onClick={handleClick}>
              <GitHub fill='#fff' width={24} height={24} />
              Login with Github
            </Button>
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img{
          width: 120px;
        }
        section{
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1{
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2{
          font-size: 21px;
          margin: 0;
          color: ${colors.secondary};
        }
        div{
          margin-top: 16px;
        }
        `}</style>
    </>
  )
}
