import { useEffect, useState } from "react"
import AppLayout from "components/AppLayout"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "firebase/client"

export default function HomePage() {
  
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
        {timeline.map(
            ({ createdAt, userName, avatar, content, userId }) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={userId}
                key={userId}
                content={content}
                userName={userName}
                userId={userId}
              />
            )
          )}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
          padding-left: 15px;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
        }
        nav {
          bottom: 0;
          background: #fff;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}