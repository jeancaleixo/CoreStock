import HeaderHome from "./components/Home/headerHome"
import hearoFigure from "./assets/heroFigure.png"

function App() {
  return (
    <>
      <div>
        <HeaderHome/>
        <div className="flex items-center w-auto">
          <section className="w-screen py-32 bg-amber-100">
            <div className="mx-auto max-w-screen-xl w-full px-4">
              <div className="flex w-full justify-between items-center my-10">
                <div className="w-1/2">
                  <span className="text-3xl">Apoiamos empreendedores na <br /> realização de seus sonhos,<br /> simplificando a gestão de micro e<br /> pequenos negócios.</span>
                </div>
                <div className="w-1/2 flex justify-end">
                  <img className="max-w-full w-80 lg:w-[480px] h-auto" src={hearoFigure} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section className=""></section>
        </div>
      </div>
    </>
  )
}

export default App
