import * as React from "react";
import * as moment from "moment";

export interface State {
    dates: string[],
    widths: number[],
    colors: string[],
    showRange: boolean,
    rangeFontSize: number,
}

export const initialState: State = {
    dates: [''],
    widths: [1],
    colors: ['primary'],
    showRange: false,
    rangeFontSize: 14,
}

export class ReactProgressBar extends React.Component<{}, State>{
    constructor(props: any){
        super(props);
        this.state = initialState;
    }
    
    render(){
        const { dates, widths, colors, showRange, rangeFontSize } = this.state;
        let items = [];
        let range = <></>;
        for (const [index, value] of widths.entries()){
            const width = value * 100;
            items.push(<div className={"progress-bar" + " bg-" + colors[index]} role="progressbar" style={{width: +width + "%"}} aria-valuenow={width} aria-valuemin={0} aria-valuemax={100}></div>)
        }
        
        if (showRange && dates.length >= 2) {
            const rangeStart = moment(dates[0]);
            const rangeEnd = moment(dates[dates.length - 1]);
            range = <>
                <div style={{fontSize: +rangeFontSize + "px", display: "flex", flexDirection: "row"}}>
                    <div style={{marginRight: "auto"}}>{ rangeStart.format('l LTS') }</div>
                    <div style={{marginLeft: "auto"}}>{ rangeEnd.format('l LTS') }</div>
                </div>
            </>
        }

        return (
            <>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
                <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <div className="progress" style={{flex: 2}}>
                        {items}
                    </div>
                    {range}
                </div>
            </>
        )
    }

    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if(typeof ReactProgressBar.updateCallback === 'function'){
            ReactProgressBar.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        ReactProgressBar.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        ReactProgressBar.updateCallback = null;
    }
}

export default ReactProgressBar;