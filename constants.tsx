
import { Document } from './types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    title: 'Python Core Principles',
    category: 'Programming',
    type: 'pdf',
    content: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991. Its design philosophy emphasizes code readability with its notable use of significant whitespace.'
  },
  {
    id: 'doc-2',
    title: 'Java Platform Overview',
    category: 'Programming',
    type: 'txt',
    content: 'Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers "write once, run anywhere" (WORA).'
  },
  {
    id: 'doc-3',
    title: 'JavaScript Evolution',
    category: 'Programming',
    type: 'docx',
    content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for web page behavior.'
  },
  {
    id: 'doc-4',
    title: 'Modern India: Facts',
    category: 'India',
    type: 'pdf',
    content: 'India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area, the most populous country since mid-2023. The capital of India is New Delhi. India is a federal republic, governed under a parliamentary system.'
  },
  {
    id: 'doc-5',
    title: 'India Economy 2024',
    category: 'India',
    type: 'pdf',
    content: 'The Indian economy is the world\'s fifth-largest by nominal GDP and the third-largest by purchasing power parity (PPP). Since the start of the 21st century, annual average GDP growth has been 6% to 7%.'
  },
  {
    id: 'doc-6',
    title: 'C Programming Standard',
    category: 'Programming',
    type: 'pdf',
    content: 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion. By design, C provides constructs that map efficiently to typical machine instructions.'
  },
  {
    id: 'doc-7',
    title: 'Python: Hello World and Averages',
    category: 'Programming',
    type: 'snippet',
    content: 'Basic Python examples:\nHello World: print("Hello, World!")\nCalculate Average:\ndef get_average(numbers):\n    return sum(numbers) / len(numbers)\n\nExample use: avg = get_average([10, 20, 30])'
  },
  {
    id: 'doc-8',
    title: 'Java: Hello World and Averages',
    category: 'Programming',
    type: 'snippet',
    content: 'Basic Java examples:\nHello World:\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}\nCalculate Average:\npublic static double average(int[] nums) {\n  double sum = 0;\n  for(int n : nums) sum += n;\n  return sum / nums.length;\n}'
  },
  {
    id: 'doc-9',
    title: 'JavaScript: Hello World and Averages',
    category: 'Programming',
    type: 'snippet',
    content: 'Basic JavaScript examples:\nHello World: console.log("Hello World");\nCalculate Average:\nconst average = arr => arr.reduce((a, b) => a + b) / arr.length;\n\nExample: const result = average([1, 2, 3]);'
  },
  {
    id: 'doc-10',
    title: 'C: Hello World and Averages',
    category: 'Programming',
    type: 'snippet',
    content: 'Basic C examples:\nHello World:\n#include <stdio.h>\nint main() {\n   printf("Hello, World!");\n   return 0;\n}\nCalculate Average:\nfloat average(int arr[], int n) {\n  int sum = 0;\n  for (int i=0; i<n; i++) sum += arr[i];\n  return (float)sum / n;\n}'
  },
  {
    id: 'doc-11',
    title: 'India: Geography and States',
    category: 'India',
    type: 'pdf',
    content: 'India is divided into 28 states and 8 union territories. Major cities include Mumbai (financial hub), Bangalore (tech hub), and New Delhi (administrative capital). It shares land borders with Pakistan, China, Nepal, Bhutan, Bangladesh, and Myanmar.'
  }
];
