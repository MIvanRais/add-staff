import * as React from "react";
import { Button, Modal, ModalClose, Typography, Sheet } from "@mui/joy";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Link,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./AddStaffForm.css";

export default function AddStaffForm() {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [fieldSets, setFieldSets] = React.useState([
    {
      accountNumber: "",
      isbp: "",
      compeCode: "",
      issuer: "",
      accountType: "something",
      covenant: "",
    },
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddFieldSet = () => {
    setFieldSets([
      ...fieldSets,
      {
        accountNumber: "",
        isbp: "",
        compeCode: "",
        issuer: "",
        accountType: "something",
        covenant: "",
      },
    ]);
  };

  const handleRemoveFieldSet = (index) => {
    setFieldSets(fieldSets.filter((_, i) => i !== index));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 500,
            height: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            overflowY: "scroll",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add New Staff
          </Typography>
          <Divider />
          <Box sx={{ width: "100%", mt: 1 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={0}>
                <StepLabel>
                  General Details
                  <ArrowForwardIosIcon
                    id="collapse-icon"
                    sx={{
                      color: "#8a8a8a",
                      height: 15,
                      transform: activeStep === 0 && "rotate(90deg)",
                    }}
                  />
                </StepLabel>
                <StepContent>
                  <Stack>
                    <TextField
                      id="username"
                      label="Username"
                      variant="standard"
                    ></TextField>
                    <TextField
                      id="fullname"
                      label="Fullname"
                      variant="standard"
                      sx={{ mt: 1 }}
                    ></TextField>
                    <TextField
                      id="email"
                      label="Email"
                      variant="standard"
                      sx={{ mt: 1 }}
                      type="email"
                    ></TextField>
                  </Stack>
                  <Box
                    sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      id="next-step-btn"
                      variant="solid"
                      onClick={handleNext}
                      sx={{
                        backgroundColor: "hsl(192, 84%, 31%)",
                        "&:hover": {
                          backgroundColor: "hsl(192, 84%, 28%)",
                        },
                      }}
                    >
                      Next <ArrowForwardIosIcon sx={{ ml: 1.2, height: 15 }} />
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              <Step key={1}>
                <StepLabel>
                  Company Details
                  <ArrowForwardIosIcon
                    id="collapse-icon"
                    sx={{
                      color: "#8a8a8a",
                      height: 15,
                      transform: activeStep === 1 && "rotate(90deg)",
                    }}
                  />
                </StepLabel>
                <StepContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <TextField
                      id="company-name"
                      label="Company Name"
                      variant="standard"
                      sx={{ width: "48%" }}
                    ></TextField>
                    <TextField
                      id="cnj"
                      label="CNJ"
                      variant="standard"
                      sx={{ width: "48%" }}
                      type="number"
                    ></TextField>
                  </Stack>
                  {fieldSets.map((fieldSet, index) => (
                    <div key={index}>
                      {index > 0 && <Divider sx={{ mt: 2, mb: 0.5 }} />}
                      <Box sx={{ position: "relative", mt: 1 }}>
                        {index !== 0 && (
                          <IconButton
                            aria-label="close"
                            size="small"
                            sx={{
                              borderRadius: 0,
                              position: "absolute",
                              right: 0,
                            }}
                            onClick={() => handleRemoveFieldSet(index)}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        )}
                        <TextField
                          id={`account-number-${index}`}
                          label="Account Number"
                          variant="standard"
                          sx={{ width: "100%", mt: index > 0 && 2 }}
                          type="number"
                          value={fieldSet.accountNumber}
                          // onChange={}
                        />
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 1 }}
                      >
                        <TextField
                          id={`isbp-${index}`}
                          label="ISBP"
                          variant="standard"
                          sx={{ width: "48%" }}
                          type="number"
                          value={fieldSet.isbp}
                          // onChange={}
                        />
                        <TextField
                          id={`compe-code-${index}`}
                          label="CompeCode"
                          variant="standard"
                          sx={{ width: "48%" }}
                          type="number"
                          value={fieldSet.compeCode}
                          // onChange={}
                        />
                      </Stack>
                      <TextField
                        id={`issuer-${index}`}
                        label="Issuer"
                        variant="standard"
                        sx={{ mt: 1, width: "100%" }}
                        value={fieldSet.issuer}
                        // onChange={}
                      />
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                      >
                        <TextField
                          id={`account-type-${index}`}
                          select
                          label="Account Type"
                          defaultValue="something"
                          variant="standard"
                          sx={{ width: "48%" }}
                          value={fieldSet.accountType}
                          // onChange={}
                        >
                          <MenuItem key="0" value="something">
                            Something
                          </MenuItem>
                          <MenuItem key="1" value="someone">
                            Someone
                          </MenuItem>
                        </TextField>
                        <TextField
                          id={`convenant-${index}`}
                          label="Covenant"
                          variant="standard"
                          sx={{ width: "48%" }}
                          value={fieldSet.covenant}
                          // onChange={}
                        />
                      </Stack>
                    </div>
                  ))}
                  <Box sx={{ my: 1 }}>
                    <Link
                      href="#"
                      underline="always"
                      onClick={handleAddFieldSet}
                      sx={{
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        color: "#1f7c96",
                        mt: 1,
                      }}
                    >
                      <AddIcon sx={{ mr: 0.5 }} />
                      Add Additional Account(s)
                    </Link>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleBack}
              sx={{ mr: 1, color: "#3F4043" }}
              variant="plain"
              disabled={activeStep === 0 && true}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              // onClick={}
              // disabled={true}
              sx={{
                backgroundColor: "hsl(192, 84%, 31%)",
                "&:hover": {
                  backgroundColor: "hsl(192, 84%, 28%)",
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
