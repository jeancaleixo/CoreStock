import HeaderHome from "./components/Home/headerHome"
import heroFigure from "./assets/heroFigure.png"
import typing from "./assets/typing.png"
import wrinting from "./assets/writing.png"
import calling from "./assets/calling.png"

function App() {
  return (
    <>
      <div>
        <HeaderHome />
        <div className="flex items-center w-auto">
          <section className="w-screen py-32 bg-amber-100">
            <div className="mx-auto max-w-screen-xl w-full px-4">
              <div className="flex w-full justify-between items-center my-10">
                <div className="w-1/2">
                  <span className="text-3xl">Apoiamos empreendedores na <br /> realização de seus sonhos,<br /> simplificando a gestão de micro e<br /> pequenos negócios.</span>
                </div>
                <div className="w-1/2 flex justify-end">
                  <img className="max-w-full w-80 lg:w-[480px] h-auto" src={heroFigure} alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section className="flex items-center w-auto">
            <div className="mx-auto max-w-screen-xl w-full px-4">
              <div className="flex w-full my-10">
                <div className="w-1/2">
                  <div className="mb-10">
                    <p className="text-3xl text-center">Automatize suas <br /> operações e <br /> ganhe mais <br /> tempo para focar <br /> no crescimento <br /> do seu negócio.</p>
                  </div>
                  <div className="ml-52">
                    <p>Com o ERP CoreStock, você <br /> automatiza tarefas e otimiza <br /> processos como controle de <br /> lojas, estoque e funcionários, <br /> tudo integrado a plataformas de <br /> e-commerce e marketplaces.</p></div>
                </div>
                <div className="flex flex-column w-1/2">
                  <div className="mt-24"><img src={typing} alt="" /></div>
                  <div><img src={calling} alt="" /></div>
                  <div className="mt-24"><img src={wrinting} alt="" /></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
