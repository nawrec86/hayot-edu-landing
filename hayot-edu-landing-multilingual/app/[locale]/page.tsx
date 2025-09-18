export default function P(){return <div className='container py-20'>Hello</div>}
      <section id="products" className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">Browse highlights from ClassVR, Makeblock, Twin Science, Elecfreaks and CPT.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" id="featuredProducts"></div>
          <div className="mt-6">
            <a href={`/${typeof window!=='undefined'?window.location.pathname.split('/')[1]:'en'}/products`} className="btn btn-outline">View All Products</a>
          </div>
          <div className="mt-6 text-sm bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-3">
            We don’t publish prices online. Contact us to receive the full catalog and a tailored quote.
          </div>
        </div>
      </section>
