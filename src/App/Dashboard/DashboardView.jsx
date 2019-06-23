import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const DashboardView = () => {
    return (
        <div className='container-fluid mt-1'>
            <div className="row">
                <div className='col'>
                    <Paper className="py-5 text-center">
                        <Typography variant='h2' gutterBottom>Default Dashboard View</Typography> 
                    </Paper>
                </div>
            </div>
            
        </div>
    );
}
export default DashboardView;