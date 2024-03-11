/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listWorkouts } from "../graphql/queries";
import { createSession, updateWorkout } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SessionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Type: "",
    Date: "",
    Workouts: [],
  };
  const [Type, setType] = React.useState(initialValues.Type);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [Workouts, setWorkouts] = React.useState(initialValues.Workouts);
  const [WorkoutsLoading, setWorkoutsLoading] = React.useState(false);
  const [workoutsRecords, setWorkoutsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setType(initialValues.Type);
    setDate(initialValues.Date);
    setWorkouts(initialValues.Workouts);
    setCurrentWorkoutsValue(undefined);
    setCurrentWorkoutsDisplayValue("");
    setErrors({});
  };
  const [currentWorkoutsDisplayValue, setCurrentWorkoutsDisplayValue] =
    React.useState("");
  const [currentWorkoutsValue, setCurrentWorkoutsValue] =
    React.useState(undefined);
  const WorkoutsRef = React.createRef();
  const getIDValue = {
    Workouts: (r) => JSON.stringify({ id: r?.id }),
  };
  const WorkoutsIdSet = new Set(
    Array.isArray(Workouts)
      ? Workouts.map((r) => getIDValue.Workouts?.(r))
      : getIDValue.Workouts?.(Workouts)
  );
  const getDisplayValue = {
    Workouts: (r) => `${r?.Lift ? r?.Lift + " - " : ""}${r?.id}`,
  };
  const validations = {
    Type: [],
    Date: [],
    Workouts: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchWorkoutsRecords = async (value) => {
    setWorkoutsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ Lift: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listWorkouts.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listWorkouts?.items;
      var loaded = result.filter(
        (item) => !WorkoutsIdSet.has(getIDValue.Workouts?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setWorkoutsRecords(newOptions.slice(0, autocompleteLength));
    setWorkoutsLoading(false);
  };
  React.useEffect(() => {
    fetchWorkoutsRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Type,
          Date,
          Workouts,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            Type: modelFields.Type,
            Date: modelFields.Date,
          };
          const session = (
            await client.graphql({
              query: createSession.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createSession;
          const promises = [];
          promises.push(
            ...Workouts.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateWorkout.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      sessionID: session.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SessionCreateForm")}
      {...rest}
    >
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={Type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Type: value,
              Date,
              Workouts,
            };
            const result = onChange(modelFields);
            value = result?.Type ?? value;
          }
          if (errors.Type?.hasError) {
            runValidationTasks("Type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("Type", Type)}
        errorMessage={errors.Type?.errorMessage}
        hasError={errors.Type?.hasError}
        {...getOverrideProps(overrides, "Type")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Type,
              Date: value,
              Workouts,
            };
            const result = onChange(modelFields);
            value = result?.Date ?? value;
          }
          if (errors.Date?.hasError) {
            runValidationTasks("Date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("Date", Date)}
        errorMessage={errors.Date?.errorMessage}
        hasError={errors.Date?.hasError}
        {...getOverrideProps(overrides, "Date")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Type,
              Date,
              Workouts: values,
            };
            const result = onChange(modelFields);
            values = result?.Workouts ?? values;
          }
          setWorkouts(values);
          setCurrentWorkoutsValue(undefined);
          setCurrentWorkoutsDisplayValue("");
        }}
        currentFieldValue={currentWorkoutsValue}
        label={"Workouts"}
        items={Workouts}
        hasError={errors?.Workouts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Workouts", currentWorkoutsValue)
        }
        errorMessage={errors?.Workouts?.errorMessage}
        getBadgeText={getDisplayValue.Workouts}
        setFieldValue={(model) => {
          setCurrentWorkoutsDisplayValue(
            model ? getDisplayValue.Workouts(model) : ""
          );
          setCurrentWorkoutsValue(model);
        }}
        inputFieldRef={WorkoutsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Workouts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Workout"
          value={currentWorkoutsDisplayValue}
          options={workoutsRecords
            .filter((r) => !WorkoutsIdSet.has(getIDValue.Workouts?.(r)))
            .map((r) => ({
              id: getIDValue.Workouts?.(r),
              label: getDisplayValue.Workouts?.(r),
            }))}
          isLoading={WorkoutsLoading}
          onSelect={({ id, label }) => {
            setCurrentWorkoutsValue(
              workoutsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentWorkoutsDisplayValue(label);
            runValidationTasks("Workouts", label);
          }}
          onClear={() => {
            setCurrentWorkoutsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchWorkoutsRecords(value);
            if (errors.Workouts?.hasError) {
              runValidationTasks("Workouts", value);
            }
            setCurrentWorkoutsDisplayValue(value);
            setCurrentWorkoutsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Workouts", currentWorkoutsDisplayValue)
          }
          errorMessage={errors.Workouts?.errorMessage}
          hasError={errors.Workouts?.hasError}
          ref={WorkoutsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Workouts")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
