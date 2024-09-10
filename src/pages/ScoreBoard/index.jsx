import React, { useState } from 'react'
import { Collapsible, Divider, Event, Grid, Header, Item, Label, Paragraph, Wrapper } from './styles'

const ScoreBoard = () => {
    const [render, setRender] = useState(ItemList)
    const handleClick = (item)=> {
        setRender(prev=> {
            return prev.map(_=> {
                if(_.name === item.name) return {..._, isEvent: !_.isEvent}
                return _
            })
        })
    }
  return (
    <Wrapper>
        <Header>Score Board</Header>
        {render.map(item =>(
            <Item key={item.name}>
                <Label>
                    <Paragraph> {item.name} </Paragraph>
                    <Paragraph> {item.total} </Paragraph>
                    <Collapsible onClick={()=>handleClick(item)}> collapse </Collapsible>
                </Label>
                {/* Events */}
                {item.isEvent && <Divider/>}
                {item.isEvent ? (
                    <Event>
                        {item.events.map(event => {
                            return (
                                <Grid key={event.name}>
                                    <Paragraph>
                                    {event.name}

                                    </Paragraph>
                                    <Paragraph>
                                    {event.position}

                                    </Paragraph>
                                    <Paragraph>
                                    {event.points}

                                    </Paragraph>
                                </Grid>
                            )
                        })}
                    </Event>
                ): null}
            </Item>
        ))}
    </Wrapper>
  )
}

const ItemList = [
    {
        name: 'Denerary I',
        total: 0,
        isEvent: false,
        events: [
            { name: '100m', position: 'I', points: 15 },
            { name: '200m', position: 'II', points: 10 },
            { name: 'Long Jump', position: 'I', points: 15 },
        ]
    },
    {
        name: 'Denerary II',
        total: 0,
        isEvent: false,
        events: [
            { name: '100m', position: 'I', points: 15 },
            { name: '200m', position: 'II', points: 10 },
            { name: 'Long Jump', position: 'I', points: 15 },
        ]
    }
]

export default ScoreBoard