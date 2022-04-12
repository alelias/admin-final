import React from 'react'
//import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./home.css"
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetRg from '../../components/widgetRg/WidgetRg'

export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo />

           <WidgetLg />
           <WidgetRg />
        </div>
    )
}
