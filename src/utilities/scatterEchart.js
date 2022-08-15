import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';

export function ScatterEchart (props) {
    const [chartOption, setChartOption] = useState({});
    const [onEvents, setEvents] = useState({});

    const setOption = (echartScatterData) => {
        const chartOption = {
            grid: { top: 25, bottom: 20, right: 10 },
            xAxis: {},
            yAxis: {},
            brush: {
                toolbox: ['rect', 'polygon', 'clear']
            },
            toolbox: {
                feature: {
                    dataZoom: {}
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                }
            ],
            series: [{
                symbolSize: 5,
                data: echartScatterData.map(d => [d['x'], d['y']]),
                type: 'scatter'
              }]
        };
        setChartOption(chartOption);
    };

    useEffect(() => {
        if (props.echartScatterData !== null) {
                setEvents({'brushSelected': (params) => {
                    var brushComponent = params.batch[0];
                    var brushed = brushComponent.selected[0].dataIndex;
                    var brushedUIDs = brushed.map(d => props.echartScatterData[d].UID);
                    console.log("selected UIDs:", brushedUIDs);
                }});
                setOption(props.echartScatterData);
        }
    }, [props.echartScatterData]);

    return(
        <div>
            <ReactECharts
                option={chartOption} 
                style={{height: props.height, width: '100%'}}
                onEvents={onEvents}
            />               
        </div> 
     );
}
