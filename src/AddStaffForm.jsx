import * as React from "react";
import { useForm } from "react-hook-form";
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
      accountType: "",
      covenant: "",
    },
  ]);

  const handleNext = async () => {
    const isValid = await trigger(["username", "fullname", "email"]);
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
        accountType: "",
        covenant: "",
      },
    ]);
  };

  const handleRemoveFieldSet = (index) => {
    setFieldSets(fieldSets.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleRegistration = (formData) => {
    Object.keys(formData).forEach((key) => {
      const parts = key.split("-");
      if (parts.length === 2 && parseInt(parts[1]) >= fieldSets.length) {
        delete formData[key];
      }
    });

    console.log("FORM SUBMITTED");
    console.log(formData);
  };

  const handleError = (errors) => {
    console.log(errors);
  }; // debugging purpose

  const registerOptions = {
    username: {
      required: "Username is required",
      maxLength: {
        value: 15,
        message: "Usename cannot exceed 15 characters",
      },
    },
    fullname: {
      required: "Fullname is required",
      maxLength: {
        value: 20,
        message: "Usename cannot exceed 20 characters",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: "Invalid email address",
      },
    },
    companyName: {
      required: "Company Name is required",
      maxLength: {
        value: 40,
        message: "Usename cannot exceed 40 characters",
      },
    },
    cnj: {
      required: "CNJ is required",
    },
    accountNumber: {
      required: "Account Number is required",
      minLength: {
        value: 20,
        message: "Account Number must be at least 20 characters",
      },
      maxLength: {
        value: 20,
        message: "Account Number cannot exceed 20 characters",
      },
    },
    isbp: {
      required: "ISBP is required",
    },
    compeCode: {
      required: "CompeCode is required",
    },
    issuer: {
      required: "Issuer is required",
    },
    accountType: {
      required: "Account Type is required",
    },
    covenant: {
      required: "Covenant is required",
    },
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
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
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
                        error={!!errors.username}
                        id="username"
                        label="Username"
                        variant="standard"
                        helperText={errors?.username && errors.username.message}
                        {...register("username", registerOptions.username)}
                      ></TextField>
                      <TextField
                        error={!!errors.fullname}
                        id="fullname"
                        label="Fullname"
                        variant="standard"
                        sx={{ mt: 1 }}
                        helperText={errors?.fullname && errors.fullname.message}
                        {...register("fullname", registerOptions.fullname)}
                      ></TextField>
                      <TextField
                        error={!!errors.email}
                        id="email"
                        label="Email"
                        variant="standard"
                        sx={{ mt: 1 }}
                        type="email"
                        helperText={errors?.email && errors.email.message}
                        {...register("email", registerOptions.email)}
                      ></TextField>
                    </Stack>
                    <Box
                      sx={{
                        my: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
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
                        Next
                        <ArrowForwardIosIcon sx={{ ml: 1.2, height: 15 }} />
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
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <TextField
                        error={!!errors.companyName}
                        id="company-name"
                        label="Company Name"
                        variant="standard"
                        sx={{ width: "48%" }}
                        helperText={
                          errors?.companyName && errors.companyName.message
                        }
                        {...register(
                          "companyName",
                          registerOptions.companyName
                        )}
                      ></TextField>
                      <TextField
                        error={!!errors.cnj}
                        id="cnj"
                        label="CNJ"
                        variant="standard"
                        sx={{ width: "48%" }}
                        type="number"
                        helperText={errors?.cnj && errors.cnj.message}
                        {...register("cnj", registerOptions.cnj)}
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
                            error={!!errors[`accountNumber-${index}`]}
                            id={`account-number-${index}`}
                            label="Account Number"
                            variant="standard"
                            sx={{ width: "100%", mt: index > 0 && 2 }}
                            type="number"
                            helperText={
                              errors?.[`accountNumber-${index}`] &&
                              errors[`accountNumber-${index}`].message
                            }
                            {...register(
                              `accountNumber-${index}`,
                              registerOptions.accountNumber
                            )}
                          />
                        </Box>
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            error={!!errors[`isbp-${index}`]}
                            id={`isbp-${index}`}
                            label="ISBP"
                            variant="standard"
                            sx={{ width: "48%" }}
                            type="number"
                            helperText={
                              errors?.[`isbp-${index}`] &&
                              errors[`isbp-${index}`].message
                            }
                            {...register(`isbp-${index}`, registerOptions.isbp)}
                          />
                          <TextField
                            error={!!errors[`compeCode-${index}`]}
                            id={`compe-code-${index}`}
                            label="CompeCode"
                            variant="standard"
                            sx={{ width: "48%" }}
                            type="number"
                            helperText={
                              errors?.[`compeCode-${index}`] &&
                              errors[`compeCode-${index}`].message
                            }
                            {...register(
                              `compeCode-${index}`,
                              registerOptions.compeCode
                            )}
                          />
                        </Stack>
                        <TextField
                          error={!!errors[`issuer-${index}`]}
                          id={`issuer-${index}`}
                          label="Issuer"
                          variant="standard"
                          sx={{ mt: 1, width: "100%" }}
                          helperText={
                            errors?.[`issuer-${index}`] &&
                            errors[`issuer-${index}`].message
                          }
                          {...register(
                            `issuer-${index}`,
                            registerOptions.issuer
                          )}
                        />
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          sx={{ mt: 2 }}
                        >
                          <TextField
                            error={!!errors[`accountType-${index}`]}
                            id={`account-type-${index}`}
                            select
                            label="Account Type"
                            defaultValue="something"
                            variant="standard"
                            sx={{ width: "48%" }}
                            helperText={
                              errors?.[`accountType-${index}`] &&
                              errors[`accountType-${index}`].message
                            }
                            {...register(
                              `accountType-${index}`,
                              registerOptions.accountType
                            )}
                          >
                            <MenuItem key="0" value="something">
                              Something
                            </MenuItem>
                            <MenuItem key="1" value="someone">
                              Someone
                            </MenuItem>
                          </TextField>
                          <TextField
                            error={!!errors[`covenant-${index}`]}
                            id={`covenant-${index}`}
                            label="Covenant"
                            variant="standard"
                            sx={{ width: "48%" }}
                            helperText={
                              errors?.[`covenant-${index}`] &&
                              errors[`covenant-${index}`].message
                            }
                            {...register(
                              `covenant-${index}`,
                              registerOptions.covenant
                            )}
                          />
                        </Stack>
                      </div>
                    ))}
                    <Box sx={{ my: 1, width: "fit-content" }}>
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
                type="submit"
                variant="solid"
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
        </form>
      </Modal>
    </React.Fragment>
  );
}
