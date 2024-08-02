# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Unit Testing Library
- npm i -D vitest
- npm i @vitest/ui
- npm i -D @testing-library/react@14.2.0
- npm i -D jsdom@24.0.0
- Câu lệnh chạy npm run test:ui
- Cấu hình tại file package.json
- Cấu hình thêm file vitest.config.ts
```js
  import { defineConfig } from "vitest/config";
    export default defineConfig({
        test: {
            environment: 'jsdom',
            globals: true, // Cho phép sử dụng các hàm toàn cục như `test`, `expect`
        }
    });
  
``` package.js
{
  "name": "UnitTestingLibrary",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "@vitest/ui": "^2.0.5",
    "formik": "^2.4.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "jsdom": "^24.1.1",
    "msw": "^2.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.3.4",
    "vitest": "^2.0.5"
  }
}

## Core Api Testing Library
- render

Hàm render dùng để render một component React vào trong môi trường giả lập để kiểm thử.

```example

import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

const { container, getByText } = render(<MyComponent />);

    container: Trả về DOM node chứa component đã render.
    getByText: Trả về phần tử đầu tiên khớp với text.

- screen

Một cách tiện lợi để truy cập các phương thức tìm kiếm toàn cục của Testing Library, giúp việc đọc mã dễ hiểu hơn.

```example
import { render, screen } from '@testing-library/react';

render(<MyComponent />);
const element = screen.getByText(/some text/i);

- Queries

Các hàm truy vấn được sử dụng để tìm các phần tử trong DOM. Có nhiều loại truy vấn khác nhau:

    getBy: Trả về phần tử nếu tìm thấy, lỗi nếu không tìm thấy.
    queryBy: Trả về phần tử nếu tìm thấy, null nếu không tìm thấy.
    findBy: Trả về Promise, phù hợp cho các trường hợp cần chờ đợi như khi phần tử sẽ xuất hiện sau một thao tác không đồng bộ.

Các loại truy vấn phổ biến:

    getByText: Tìm phần tử dựa trên text.
    getByRole: Tìm phần tử dựa trên role (vai trò) của nó.
    getByLabelText: Tìm phần tử dựa trên nhãn.
    getByPlaceholderText: Tìm phần tử dựa trên văn bản giữ chỗ.
    getByTestId: Tìm phần tử dựa trên data-testid attribute.

Ví dụ sử dụng:

const button = screen.getByRole('button', { name: /submit/i });
const input = screen.getByLabelText('Username');

- userEvent

Thư viện này mô phỏng các tương tác của người dùng với ứng dụng, giúp kiểm thử các hành động như click, nhập liệu, và hơn thế nữa.

import userEvent from '@testing-library/user-event';

const input = screen.getByLabelText('Username');
userEvent.type(input, 'myusername');

const button = screen.getByRole('button', { name: /submit/i });
userEvent.click(button);

- waitFor

Hàm này giúp xử lý các thao tác không đồng bộ, chờ cho một điều kiện được thỏa mãn trước khi tiếp tục.

import { waitFor } from '@testing-library/react';

await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());

- fireEvent

Được sử dụng để kích hoạt các sự kiện thủ công, tuy nhiên userEvent thường được khuyến khích hơn vì nó mô phỏng hành vi của người dùng một cách chính xác hơn.

import { fireEvent } from '@testing-library/react';

const button = screen.getByRole('button');
fireEvent.click(button);

## Example Testing Library
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submit login form', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  await userEvent.type(usernameInput, 'myusername');
  await userEvent.type(passwordInput, 'mypassword');
  await userEvent.click(submitButton);

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    username: 'myusername',
    password: 'mypassword',
  }));
});

## Vitest core Api
- test / it

Dùng để định nghĩa một bài kiểm thử đơn lẻ. Bạn có thể sử dụng test hoặc it (chúng là alias của nhau).

test('mô tả bài kiểm thử', () => {
  // logic kiểm thử ở đây
});

it('mô tả bài kiểm thử', () => {
  // logic kiểm thử ở đây
});

- expect

Được dùng để tạo các assertion (khẳng định) về trạng thái của mã cần kiểm thử.

expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toContain(item);

- vi.fn

Sử dụng để tạo các mock function, tương tự như jest.fn().

const mockFunction = vi.fn();
mockFunction();
expect(mockFunction).toHaveBeenCalled();

- beforeEach / afterEach

Chạy một chức năng trước hoặc sau mỗi bài kiểm thử. Thường được sử dụng để thiết lập hoặc dọn dẹp môi trường kiểm thử.

beforeEach(() => {
  // logic chạy trước mỗi bài kiểm thử
});

afterEach(() => {
  // logic chạy sau mỗi bài kiểm thử
});

- beforeAll / afterAll

Chạy một chức năng trước hoặc sau tất cả các bài kiểm thử trong một file kiểm thử.

beforeAll(() => {
  // logic chạy một lần trước tất cả các bài kiểm thử
});

afterAll(() => {
  // logic chạy một lần sau tất cả các bài kiểm thử
});

- describe

Dùng để nhóm các bài kiểm thử lại với nhau, giúp tổ chức kiểm thử tốt hơn.

describe('mô tả nhóm kiểm thử', () => {
  test('bài kiểm thử 1', () => {
    // logic kiểm thử
  });

  test('bài kiểm thử 2', () => {
    // logic kiểm thử
  });
});

## Example Vitest
import { describe, test, expect, vi, beforeEach } from 'vitest';

describe('MyFunction Tests', () => {
  let mockFunction;

  beforeEach(() => {
    mockFunction = vi.fn();
  });

  test('should call the mock function', () => {
    mockFunction();
    expect(mockFunction).toHaveBeenCalled();
  });

  test('should return the correct value', () => {
    const result = 5;
    expect(result).toBe(5);
  });
}); 

## Video learn course beginners React Testing
- React Testing for Beginners: Start Here! - https://www.youtube.com/watch?v=8Xwq35cPwYg

## Doc library
https://testing-library.com/docs/react-testing-library/intro
https://vitest.dev/guide/mocking.html

## Example library
https://testing-library.com/docs/example-react-formik/

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
