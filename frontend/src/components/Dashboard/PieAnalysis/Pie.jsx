'use client'
import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

function Pie() {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.dispose();
    }

    let root = am5.Root.new("chartpie");
    chartRef.current = root;

    let chart = root.container.children.push( 
      am5percent.PieChart.new(root, {
        layout: root.horizontalLayout
      }) 
    );

    // Define data
    let data = [
      {
        store: "Shoope",
        sales: 80000,
      },
      {
        store: "Mercado Livre",
        sales: 70000,
      },
    ];
    // Define responsive rules
    // const responsive = am5themes_Responsive.new(root);
    // responsive.addRule({
    //   relevant: am5themes_Responsive.widthL,
    //   applying: function() {
    //     chart.set("layout", root.verticalLayout);
    //     legend.setAll({
    //       layout: root.verticalLayout,
    //       width: am5.percent(90),
    //       height: am5.percent(20),
    //       centerX: am5.percent(50),
    //       x: am5.percent(30),
    //       y: am5.percent(65)
    //     });
    //   },
    //   removing: function() {
    //     chart.set("layout", root.horizontalLayout);
    //     legend.setAll({
    //       layout: root.verticalLayout,
    //       width: am5.percent(90),
    //       height: am5.percent(20),
    //       centerY: am5.percent(60),
    //       y: am5.percent(35),
    //       x: am5.percent(50)
    //     });
    //   }
    // });
    
    // root.setThemes([
    //   responsive
    // ]);
    

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "store",
        y: am5.percent(-15),
        x: am5.percent(12),
      })
    );
    series.data.setAll(data);

    series.slices.template.setAll({
      fillOpacity: 0.8,
      fill: '#5A6ACF',
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
      radius: am5.percent(50),
    });

    series.labels.template.set("forceHidden", true);
    series.labels.template.setAll({
      radius: 30,
      inside: true,
    });
    series.ticks.template.set("visible", false);

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        layout: root.verticalLayout,
        width: am5.percent(90),
        height: am5.percent(20),
        centerX: am5.percent(50),
        x: am5.percent(32),
        y: am5.percent(65)
      })
    );
    
    legend.labels.template.setAll({            // Set max width and wrapping
      // responsivo, md aumentar o maxWidth
      maxWidth: 65,
      oversizedBehavior: "wrap"
    });

    legend.valueLabels.template.setAll({      // Makes labels to be right-aligned
      width: 10,
      textAlign: "left"
    });
    legend.data.setAll(series.dataItems);

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, []);

  return <div id="chartpie" className="w-[100%] md:w-[60%] lg:w-[240px] h-[300px]"></div>;
}

export default Pie;
