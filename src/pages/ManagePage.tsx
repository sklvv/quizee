import { getInfoAboutQuizee, useManageStore } from "@/features/manageQuizee";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import {
	Await,
	useLoaderData,
	useNavigation,
	useParams,
} from "react-router-dom";

const ManagePage = () => {
	const { id } = useParams();
	const initStore = useManageStore(state => state.initStore);
	const { title, questions } = useManageStore(state => state);

	const info: any = useLoaderData();
	const navState = useNavigation();

	if (navState.state === "loading") {
		console.log(info);
		return <Box>loading</Box>;
	}
	console.log(navState.state);

	return <Box>temp</Box>;
};

export default ManagePage;
