import { checkForURL } from "../urlChecker.js";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the checkForURLfunctionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing empty string", () => {
        expect(checkForURL('')).toBe(false);
    }),
    
    test("Testing strings with spaces", () => {
        expect(checkForURL('www google com')).toBe(false);
    }),

    test("Testing strings with non url characters", () => {
        expect(checkForURL('{[()]}')).toBe(false);
        expect(checkForURL('^^^^^')).toBe(false);
        expect(checkForURL('~~~~~')).toBe(false);
        expect(checkForURL('||||')).toBe(false);
    }),

    test("Testing strings that aren't in url format", () => {
        expect(checkForURL('@thisisnotvalid@gmail.com')).toBe(false);
    }),

    test("Testing strings that are in url format", () => {
        expect(checkForURL('www.google.com')).toBe(true);
    })
    
});
