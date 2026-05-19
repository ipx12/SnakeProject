import MainButton from "./components/web/buttons/mainButton"


function App() {
  return (
    <>
      <main className="h-screen bg-[#3e3d3c] p-10 flex flex-col gap-8 items-start">
        <MainButton>GET IN TOUCH</MainButton>
        <MainButton>JOIN THE TEAM</MainButton>
        <MainButton>OOPS, TAKE ME BACK</MainButton>
      </main>
    </>
  )
}

export default App
