import HeaderHome from "./components/Home/headerHome"

function App() {
  return (
    <>
      <div>
        <HeaderHome/>
        <div className="flex items-center mx-auto max-w-screen-xl">
          <section className="flex">
            <div className="flex">
              <div className="flex justify-start"><span>Apoiamos empreendedores na <br /> realização de seus sonhos,<br /> simplificando a gestão de micro e<br /> pequenos negócios.</span></div>
              <div className="flex justify-end"><span>imagem aqui</span></div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
