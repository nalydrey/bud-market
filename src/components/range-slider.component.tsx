import { Slider } from "@mui/material"
import { useState } from "react"

interface RangeSliderProps {
    max?: number
    minDistance?: number
    onChangeCommitted?: (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => void
}

export const RangeSlider = ({
    max = 100,
    minDistance = 0,
    onChangeCommitted
}: RangeSliderProps) => {

    const [range, setRange] = useState<[number, number]>([1000, 5000])

    const handleChangeSlider = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
      ) => {

        console.log(newValue, activeThumb);
        // const max = max
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], max - minDistance);
            setRange([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setRange([clamped - minDistance, clamped]);
          }
        } else {
            setRange(newValue as [number, number]);
        }
      };

    const handleChangeCommited = (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        onChangeCommitted && onChangeCommitted(event, value)
    }

    const handleChangeInput = (value: string, index: number) => {

    }

    return (
        <div className="p-5 z-30 mt-3">
            <Slider
                color="warning"
                getAriaLabel={() => 'Minimum distance shift'}
                value={range}
                max={max}
                onChange={handleChangeSlider}
                onChangeCommitted={handleChangeCommited}
                valueLabelDisplay="auto"
                // disableSwap
            />
            <div className="flex gap-5 items-center justify-between">
                <input 
                    type="number" 
                    className="max-w-[100px] rounded-md text-center"
                    value={range[0]}
                    onChange={(e) => handleChangeInput(e.target.value, 1)}
                />
                <span className="h-[2px] bg-white w-10 rounded-md"/>
                <input 
                    type="number" 
                    className="max-w-[100px] rounded-md text-center"
                    value={range[1]}
                    onChange={(e) => handleChangeInput(e.target.value, 1)}
                />
            </div>
        </div>
    )
}