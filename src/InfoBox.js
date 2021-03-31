import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'
function InfoBox({ title, cases, active, isRed, total, ...props }) {
    return (
        <div className={`infoBox ${active && 'infobox_selected'} ${isRed && 'infobox_red'}`}>
            <Card
                onClick={props.onClick}
            >
                <CardContent>
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className={`infoBox_cases ${!isRed && "infobox_green"}`}> {cases}</h2>
                    <Typography className="infoBox_total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}

export default InfoBox
