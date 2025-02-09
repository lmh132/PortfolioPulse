export async function storeUserInAWS(uid, firstName, lastName, email) {
  try {
    let name = `${firstName} ${lastName}`;

    const response = await fetch(
      "https://b6afxhw1s3.execute-api.us-east-1.amazonaws.com/dev/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: uid,
          name: name,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to store user in AWS: ${response.statusText}`);
    }

    console.log("User stored in AWS successfully");
  } catch (error) {
    console.error("Error storing user in AWS:", error);
  }
}

export async function getUser(uid) {
  try {
    const response = await fetch(
      `https://b6afxhw1s3.execute-api.us-east-1.amazonaws.com/dev/user?user_id=${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user in AWS: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error storing user in AWS:", error);
  }
}
