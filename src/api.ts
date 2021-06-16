import { CarModel } from "./components/models/carModel";
import { WinnerModel } from "./components/models/winnerModel";

const base = "http://localhost:3000";

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit: number) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return await response.json();
};

export const getCarAmount = async (page: number, limit: number) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return response.headers.get("X-Total-Count");
};

export const getCar = async (id: string) => {
  return (await fetch(`${garage}/${id}`)).json();
};

export const createCar = async (body: Object) => {
  return await fetch(`${garage}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCar = async (id: string) => {
  return (
    await fetch(`${garage}/${id}`, {
      method: "DELETE",
    })
  ).json();
};

export const updateCar = async (id: string, body: Object) => {
  return await fetch(`${garage}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const startEngine = async (id: string) => {
  return (await fetch(`${engine}?id=${id}&status=started`)).json();
};

export const stopEngine = async (id: string) => {
  return (await fetch(`${engine}?id=${id}&status=stopped`)).json();
};

export const engineDriveMode = async (id: string) => {
  const result = await fetch(`${engine}?id=${id}&status=drive`).catch();
  if (result.status !== 200) {
    return {
      success: false,
    };
  } else {
    return {
      ...(await result.json()),
    };
  }
};

export const getSortOrder = async (sort: string, order: string) => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
};

export const getWinners = async (
  page: number,
  limit: number,
  sortOrder: string
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}&${sortOrder}`
  );
  return await response.json();
};

export const getWinnersAmount = async (
  page: number,
  limit: number,
  sortOrder: string
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}&${sortOrder}`
  );
  return response.headers.get("X-Total-Count");
};

export const getWinner = async (id: string) => {
  return (await fetch(`${winners}/${id}`)).json();
};

export const createWinner = async (body: Object) => {
  return await fetch(`${winners}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteWinner = async (id: string) => {
  return (
    await fetch(`${winners}/${id}`, {
      method: "DELETE",
    })
  ).json();
};

export const updateWinner = async (id: string, body: Object) => {
  return await fetch(`${winners}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetRandomColor = (): string => {
  const symbols = "ABCDEF1234567890";
  let result = "#";
  for (let i = 0; i < 6; i++) {
    result += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return result;
};

export const GetRandomName = (): string => {
  const mark = [
    "Tesla",
    "Mercedes",
    "BMW",
    "Toyota",
    "Nissan",
    "Ferrari",
    "Bugatti",
    "Lada",
    "Mazda",
    "Audi",
    "Volkswagen",
    "Ford",
    "Dodge",
    "Chevrolet",
  ];
  const model = [
    "Model S",
    "C63",
    "M5",
    "Supra",
    "GTR",
    "F40",
    "Veyron",
    "Vesta Sport",
    "RX-7",
    "A8",
    "Golf",
    "Focus RS",
    "Challenger",
    "Corvette",
  ];
  return `${mark[Math.floor(Math.random() * mark.length)]} ${
    model[Math.floor(Math.random() * model.length)]
  }`;
};

export const CreateCarObj = (
  carName: string,
  carColor: string,
  carId: string
): CarModel => {
  return {
    name: carName,
    color: carColor,
    id: carId,
  };
};
