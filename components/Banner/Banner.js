import React from 'react'
import "./Banner.css"

const Banner = () => {
  return (
    <>
        <div className='banner'>
            <div className="banner-container pb-5">
                <div className="banner-content col-sm-12 col-md-12 col-lg-6 mt-5">
                    <div className=''>
                        <h1>FLOW</h1>
                        <p>An enterprise solution that provides real-time visibility of your cargo across the globe. Consolidate
                            your documents, stay up to date with correspondence and get the latest data on your cargo all in one platform.
                        </p>
                    </div>
                    <div className='mt-5'>
                        <button class="btn btn-light">REQUEST A DEMO</button>
                        <button class="btn btn-light ms-3">TRACK NOW</button>
                    </div>
                </div>
            </div>
        </div>

        <section class="thirdsection pt-5" id="services">
            <div class="container">
                <div class="row serv">
                    <h3>Services</h3>
                    <h1>Check out the great services we offer</h1>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="servcard shadow">
                            <div><iconify-icon class="servicon" icon="icon-park-outline:dribble"></iconify-icon></div>
                            <h5>End-To-End Tracking</h5>
                            <p>Track your multimodal shipments from origin to destination.</p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="servcard shadow">
                            <div><iconify-icon class="servicon" icon="bx:file"></iconify-icon></div>
                            <h5>Supply Chain Visibility</h5>
                            <p>Understand the availability of your products for every purchase order.</p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="servcard shadow">
                            <div><iconify-icon class="servicon" icon="bx:tachometer"></iconify-icon></div>
                            <h5>Manage By Exception</h5>
                            <p>Receive email notifications for key milestone events and intransit exceptions.</p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="servcard shadow">
                            <div><iconify-icon class="servicon" icon="bx:world"></iconify-icon></div>
                            <h5>Insights Reports</h5>
                            <p>Gain insight on your logistics network performance and optimization opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner