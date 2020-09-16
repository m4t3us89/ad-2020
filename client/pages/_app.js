import NProgress from "nprogress";
import ThemeContainer from "../contexts/theme/ThemeContainer";
import Router from "next/router";
import { Box } from "@chakra-ui/core";

Router.events.on("routeChangeStart", function (url) {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", function () {
  NProgress.done();
});

Router.events.on("routeChangeError", function () {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Box d="flex" alignItems="center" justifyContent="center" h="100vh">
        <Box
          borderWidth="1px"
          rounded="lg"
          borderColor="white"
          maxW="lg"
          overflow="auto"
          width="400px"
          height="600px"
          p="10"
          bg="gray.600"
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </ThemeContainer>
  );
}

export default MyApp;
