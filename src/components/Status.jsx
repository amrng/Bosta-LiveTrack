import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useSelector } from 'react-redux';


export default function Status(props) {
    const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor:
      props.Current === "CANCELLED"
      ? "#E30614" 
      : props.Current === "DELIVERED_TO_SENDER" 
      ? "#FACC14"
      : "#22C55D"
      ,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor:
      props.Current === "CANCELLED"
      ? "#E30614" 
      : props.Current === "DELIVERED_TO_SENDER" 
      ? "#FACC14"
      : "#22C55D"
      ,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: 'gray',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: '#9CA3AF',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor:
      props.Current === "CANCELLED"
      ? "#E30614" 
      : props.Current === "DELIVERED_TO_SENDER" 
      ? "#FACC14"
      : "#22C55D"
      ,
  }),
  ...(ownerState.completed && {
    backgroundColor:
      props.Current === "CANCELLED"
      ? "#E30614" 
      : props.Current === "DELIVERED_TO_SENDER" 
      ? "#FACC14"
      : "#22C55D"
      ,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <i className="fa-solid fa-check"></i>,
    2: active 
    ? <i className="fa-solid fa-boxes-packing"></i> 
    : completed 
    ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-boxes-packing"></i> ,

    3: active 
    ? <i className="fa-solid fa-truck-fast"></i> 
    : completed 
    ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-truck-fast"></i> ,

    4: active 
    ? <i className="fa-solid fa-truck-ramp-box"></i> 
    : completed
    ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-truck-ramp-box"></i>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed ,active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Shipment Created', 'Package Received', 'Out For Delivery', 'Delivered'];
  let { trackedData } = useSelector((state)=> state.track)
  let lastStatus = trackedData?.CurrentStatus?.state
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel 
      activeStep={ lastStatus === 'TICKET_CREATED' 
      ? 0
      : lastStatus === 'PACKAGE_RECEIVED'
      ? 1
      : lastStatus === 'OUT_FOR_DELIVERY'
      ? 2
      : lastStatus === 'DELIVERED'
      ? 3 : 2
        
      } connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}