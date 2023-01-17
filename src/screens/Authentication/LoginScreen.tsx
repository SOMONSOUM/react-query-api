import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import Swal from "sweetalert2";
import { AxiosClient } from "../../config/AxiosClient";

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async ({ username, password }: { username: string; password: string }) => {
    const response = await AxiosClient.post('/login', { username, password });

    if (response?.data?.token) {
      localStorage.setItem('token', response?.data?.token);
      return response.data;
    }
  }

  const { mutate } = useMutation("login", {
    mutationFn: login,
    onError: (err: any) => {
      const error = JSON.parse(err?.message);
      Swal.fire({
        icon: 'error',
        title: "Failed",
        text: `${error.errorMessage}`,
        footer: 'Click to see more',
        confirmButtonText: 'Ok',
      });
    },
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token)

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login to System',
        footer: `Welcome to System!`,
        showConfirmButton: false,
        timer: 2000,
      })
      window.location.replace('/')
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({ username, password })
  }
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e?.target?.value)}
          />
          <Label for="username">
            Username
          </Label>
        </FormGroup>
        {' '}
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <Label for="password">
            Password
          </Label>
        </FormGroup>
        {' '}
        <Button color="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}