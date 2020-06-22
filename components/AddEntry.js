import React, { Component } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInformation } from "../utils/helpers";
import Sliders from "./sliders";
import Steppers from "./steppers";

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInformation(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: (count > max) ? max : count,
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInformation(metric)

        this.setState((state) => {
            const count = state[metric] - step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }))
    }

    render() {
        const metaInfo = getMetricMetaInformation()
        return (
            <View>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ?   <Sliders 
                                        value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest}
                                    />
                                :   <Steppers 
                                        value={value}
                                        onIncrement={(value) => this.increment(key)}
                                        onDecrement={(value) => this.decrement(key)}
                                        {...rest}
                                    />
                            }
                        </View>
                    )
                })}
            </View>
        )
    }
}