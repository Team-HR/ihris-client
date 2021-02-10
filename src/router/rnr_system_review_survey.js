import RnrSystemReviewSurvey from "../views/rnr/system_review_survey";

const routes = [
    {
        path: "/rnr-system_review_survey",
        name: "system_review_survey",
        component: RnrSystemReviewSurvey,
        meta: {
            title: "RNR System Review Survey",
            auth: false
        }
    },
];

export default routes;
