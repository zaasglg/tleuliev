export const API_ENDPOINTS = {
	user: 'user',
	userTests: 'user/tests',
	seachTest: (key: string) => `seach/tests/${key}`,
	testDetail: (testId: number) => `tests/${testId}`,
	userAnswers: 'user-answers',
	userReportsDone: 'user/update/reports/done',
	fetchUserAnswers: 'user/answers',
	fetchUserReports: 'user/reports',
	userFeedbacks: 'user/feedbacks',
	feedbacks: 'feedbacks',
	feedbacksDetail: (feedbackId: number) => `feedbacks/${feedbackId}`,
}
