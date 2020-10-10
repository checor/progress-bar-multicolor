import * as React from "react";

export interface State {
    widths: number[],
    colors: string[],
}

export const initialState: State = {
    widths: [1],
    colors: ['primary']
}

export class ReactProgressBar extends React.Component<{}, State>{
    constructor(props: any){
        super(props);
        this.state = initialState;
    }
    
    render(){
        const { widths, colors } = this.state;
        let items = [];
        for (const [index, value] of widths.entries()){
            const width = value * 100;
            items.push(<div className={"progress-bar" + " bg-" + colors[index]} role="progressbar" style={{width: +width + "%"}} aria-valuenow={width} aria-valuemin={0} aria-valuemax={100}></div>)
        }
        return (
            <>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
                <div className="progress" style={{height: "100%"}}>
                    {items}
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