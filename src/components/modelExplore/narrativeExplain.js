import React, {useEffect, useState} from "react";
import '../../styles/modelExplor.css';
import { Card, Descriptions, Button, Row, Col, Typography} from 'antd';
import * as d3 from 'd3';
import { EditOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { LocalR2Narrative } from "./narrativeParagraph/localR2Narr";

export function NarrativeExplain (props) {
    const { Paragraph, Text, Link } = Typography;

    const [cardDisplay, setCardDisplay] = useState('block');
    const [minCardDisplay, setMinCardDisplay] = useState({display: 'none'});
    const [narrativeInfo, setNarrativeInfo] = useState(null);

    const [goodLocalR2Areas, setGoodLocalR2Areas] = useState("");
    const [badLocalR2Areas, setBadLocalR2Areas] = useState("");

    const cardBodyDisplay = {
        display: cardDisplay,
        padding: 12,
        height: 300,
        overflow: 'auto',
    };
    const btnDisplay = {
        display: cardDisplay,
        marginLeft: 5,
        float: 'left'
    };

    const closeBtnClick = () => {
        props.setNarrativeContainerDisplay({display: 'none'});
        props.setNarrativeBtnSelect(null);
    };

    const minBtnClick = () => {
        setCardDisplay('none');
        setMinCardDisplay({display: 'block', float: 'left'});
    };

    const maxBtnClick = () => {
        setCardDisplay('block');
        setMinCardDisplay({display: 'none'});
    };

    const makeNarrative = (model_result, selectedRowKeys) => {
        const key = selectedRowKeys[0];
        const geojsonObj = model_result.geojson_poly.features.map(e=>e.properties);
        const stat = model_result[key];
        if(key === 'local_R2'){
            setNarrativeInfo(
                <LocalR2Narrative
                    selectedRowKeys={props.selectedRowKeys}
                    model_result={props.model_result}
                />
            );
        }

    };

    useEffect(()=>{
        if(props.model_result !== {}){
            makeNarrative(props.model_result, props.selectedRowKeys);
        }
    }, [props.model_result, props.selectedRowKeys]);

    return(
        <div className='narrativeExplainContainer' style={props.narrativeContainerDisplay}>
            <Card
                title={'Explain the Spatial Distribution: '+ props.selectedRowKeys[0]}
                size="small"
                className="explorationCard"
                bodyStyle={cardBodyDisplay}
                extra={
                    <div
                    style={{
                        display: 'inline-block',
                        fontSize: 12
                    }}
                >
                    <Button 
                    style={btnDisplay} 
                    size='small' icon={<MinusOutlined />}
                    onClick={() => minBtnClick()}
                    ></Button>

                    <Button 
                        style={btnDisplay} 
                        size='small' icon={<CloseOutlined />}
                        onClick={() => closeBtnClick()}
                    ></Button>

                    <Button 
                    size='small' style={minCardDisplay}
                    icon={<PlusOutlined />}
                    onClick={() => maxBtnClick()}
                    ></Button>
                </div>
                }
            >
                {narrativeInfo}
            </Card>
        </div>
    );
}
