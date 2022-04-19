import useAuth from "../hooks/useAuth"

const HomePage = () => {

    const { user } = useAuth();

  return (
    <>
        <p>Hello {user ? user.name : 'Stranger! Please Login or Register.'}</p>
    </>
  )
}

export default HomePage