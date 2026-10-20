import Styles from "./_styles/writingRhythm.module.scss";

type WritingRhythmProps = {
	posts: any[];
	className?: string;
};

const WEEK_COUNT = 49;

export const parsePostDate = (post: any) => {
	const value = post.publishedAt || post.created;
	if (!value) return null;
	if (value instanceof Date) return value;
	if (typeof value?.toDate === "function") return value.toDate();
	if (typeof value?.seconds === "number") return new Date(value.seconds * 1000);
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const startOfWeek = (value: Date) => {
	const date = new Date(value);
	date.setHours(0, 0, 0, 0);
	const day = date.getDay();
	date.setDate(date.getDate() - (day === 0 ? 6 : day - 1));
	return date;
};

const weekKey = (value: Date) => {
	const year = value.getFullYear();
	const month = String(value.getMonth() + 1).padStart(2, "0");
	const day = String(value.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const buildWritingWeeks = (posts: any[]) => {
	const currentWeek = startOfWeek(new Date());
	const activity = new Map<string, number>();
	posts.forEach((post) => {
		const published = parsePostDate(post);
		if (!published) return;
		const key = weekKey(startOfWeek(published));
		activity.set(key, (activity.get(key) || 0) + 1);
	});

	return Array.from({ length: WEEK_COUNT }, (_, index) => {
		const date = new Date(currentWeek);
		date.setDate(date.getDate() - (WEEK_COUNT - 1 - index) * 7);
		return { date, count: activity.get(weekKey(date)) || 0 };
	});
};

const WritingRhythm = ({ posts, className = "" }: WritingRhythmProps) => {
	const writingWeeks = buildWritingWeeks(posts);
	const activeWeekCount = writingWeeks.filter((week) => week.count > 0).length;
	let streakIndex = writingWeeks.length - 1;
	if (writingWeeks[streakIndex]?.count === 0) streakIndex -= 1;
	let currentStreak = 0;
	while (streakIndex >= 0 && writingWeeks[streakIndex].count > 0) {
		currentStreak += 1;
		streakIndex -= 1;
	}

	const monthLabels = writingWeeks.flatMap((week, index) => {
		const previous = writingWeeks[index - 1]?.date;
		if (previous && previous.getMonth() === week.date.getMonth() && previous.getFullYear() === week.date.getFullYear()) return [];
		const showYear = index === 0 || week.date.getMonth() === 0;
		const month = week.date.toLocaleDateString("en-ZA", { month: "short" });
		const year = String(week.date.getFullYear()).slice(-2);
		return [{ index, label: showYear ? `${month} ’${year}` : month }];
	});

	return (
		<section className={`${Styles.streakSection} ${className}`} aria-labelledby="writing-streak-heading">
			<div className={Styles.streakHeader}>
				<div>
					<span>Writing rhythm</span>
					<h2 id="writing-streak-heading">{currentStreak} week{currentStreak === 1 ? "" : "s"} in the current streak</h2>
				</div>
				<p><strong>{activeWeekCount}</strong> active week{activeWeekCount === 1 ? "" : "s"} in the last 49</p>
			</div>
			<div className={Styles.weekScroller}>
				<div className={Styles.monthGrid} aria-hidden="true">
					{monthLabels.map((month) => <span key={`${month.label}-${month.index}`} style={{ gridColumn: month.index + 1 }}>{month.label}</span>)}
				</div>
				<div className={Styles.weekGrid} role="img" aria-label={`${activeWeekCount} active writing weeks out of the last 49`}>
					{writingWeeks.map((week) => {
						const label = `Week of ${week.date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}: ${week.count} published ${week.count === 1 ? "post" : "posts"}`;
						return <span key={week.date.toISOString()} className={`${Styles.weekBox} ${week.count > 0 ? Styles.weekActive : ""} ${week.count > 1 ? Styles.weekStrong : ""}`} title={label} aria-label={label} />;
					})}
				</div>
				<div className={Styles.weekLabels}><span>49-week view</span><span>This week</span></div>
			</div>
			<p className={Styles.streakNote}>Each blue square marks a week when this writer published at least one article.</p>
		</section>
	);
};

export default WritingRhythm;
