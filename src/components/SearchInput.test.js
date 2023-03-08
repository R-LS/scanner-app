const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


import SearchInput from "./SearchInput"
import { render,fireEvent,screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {QueryClient,QueryClientProvider}  from 'react-query';


const queryClient = new QueryClient()

beforeEach(() => {
  render(<QueryClientProvider client={queryClient}><SearchInput/></QueryClientProvider>)
});

const testInput = async(name, value, fieldError, id) => {
  const textfield = screen.getByRole("textbox",{name: name})
  fireEvent.change(textfield, {target: {value: value}})
  userEvent.click(screen.getByText('Scan'))
  var fieldError = await screen.findByText(fieldError)
  expect(fieldError).toBeTruthy()
  expect(fieldError.id).toBe(id)
}

//error message testing
describe("Input validation negative test cases",()=>{
test("Project Name must be more than 3 characters",async()=>{
  testInput("Project Name","A","Must be more than 3 characters","projectName-helper-text")
})

test("X Dimension must be 1 or greater",async()=>{
  testInput("Scan DimensionX(cm)","0","Must be 1 or larger","scanDimensionsX-helper-text")
})

test("X Dimension must be number",async()=>{
  testInput("Scan DimensionX(cm)","A","Must be a number","scanDimensionsX-helper-text")
})

test("X Dimension must be integer",async()=>{
  testInput("Scan DimensionX(cm)","1.0","Must be an integer","scanDimensionsX-helper-text")
})

test("Y Dimension must be 1 or greater",async()=>{
  testInput("Scan DimensionY(cm)","0","Must be 1 or larger","scanDimensionsY-helper-text")
})

test("Y Dimension must be number",async()=>{
  testInput("Scan DimensionY(cm)","A","Must be a number","scanDimensionsY-helper-text")
})

test("Y Dimension must be integer",async()=>{
  testInput("Scan DimensionY(cm)","1.0","Must be an integer","scanDimensionsY-helper-text")
})

test("Scanner frequency must be 1 or greater", async()=>{
    testInput("Scanner Frequency (GHz)",'0','Must be 1 or larger',"scannerFrequency-helper-text")
})

test("Scanner frequency must be number or decimal",async()=>{
  testInput("Scanner Frequency (GHz)","A","Must be a number or decimal","scannerFrequency-helper-text")
})

test("Scanner frequency must be number or decimal",async()=>{
  testInput("Scanner Frequency (GHz)","1.11","Must be maximum 1 decimal point value","scannerFrequency-helper-text")
})

test("All 5 fields should be required",async ()=>{
    // ACT
    userEvent.click(screen.getByText('Scan'))
    var fieldRequired = await screen.findAllByText('This field is required')
    //ASSERT
    expect(fieldRequired.length).toBe(5)
    expect(fieldRequired[0].id).toBe("projectName-helper-text")
    //expect(fieldRequired[1].id).toBe("scanningMode-helper-text")
    expect(fieldRequired[2].id).toBe("scanDimensionsX-helper-text")
    expect(fieldRequired[3].id).toBe("scanDimensionsY-helper-text")
    expect(fieldRequired[4].id).toBe("scannerFrequency-helper-text")
})})


