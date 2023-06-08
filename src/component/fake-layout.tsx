import { PropsWithChildren, useState } from 'react';

export function FakeLayout({children}: PropsWithChildren) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	return (
		// <>
		<div>
			<div className='flex h-screen overflow-y-hidden bg-white'>
				{/* <!-- Sidebar backdrop --> */}
				{isSidebarOpen && (
					<div className='fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden backdrop-blur-lg backdrop-filter'></div>
				)}

				{/* <!-- Sidebar --> */}
				<aside className='fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none'>
					{/* <!-- sidebar header --> */}
					<div
						className={
							'flex items-center justify-between flex-shrink-0 p-2' &&
							`${'lg:justify-center' && !isSidebarOpen}`
						}>
						<span className='p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap'>
							K<span className={`${'lg:hidden' && !isSidebarOpen}`}>-WD</span>
						</span>
						<button
							onClick={() => setIsSidebarOpen(true)}
							className='p-2 rounded-md lg:hidden'>
							<svg
								className='w-6 h-6 text-gray-600'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					{/* <!-- Sidebar links --> */}
					<nav className='flex-1 overflow-hidden hover:overflow-y-auto'>
						<ul className='p-2 overflow-hidden'>
							<li>
								<a
									href='#'
									className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
										'justify-center' && !isSidebarOpen
									}`}>
									<span>
										<svg
											className='w-6 h-6 text-gray-400'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
											/>
										</svg>
									</span>
									<span className={`${isSidebarOpen && 'lg:hidden'}`}>
										Dashboard
									</span>
								</a>
							</li>
							{/* <!-- Sidebar Links... --> */}
						</ul>
					</nav>
					{/* <!-- Sidebar footer --> */}
					<div className='flex-shrink-0 p-2 border-t max-h-14'>
						<button className='flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'>
							<span>
								<svg
									className='w-6 h-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
									/>
								</svg>
							</span>
							<span className={`${isSidebarOpen && 'lg:hidden'}`}> Logout </span>
						</button>
					</div>
				</aside>

				<div className='flex flex-col flex-1 h-full overflow-hidden'>
					{/* <!-- Navbar --> */}
					<header className='flex-shrink-0 border-b'>
						<div className='flex items-center justify-between p-2'>
							{/* <!-- Navbar left --> */}
							<div className='flex items-center space-x-3'>
								<span className='p-2 text-xl font-semibold tracking-wider uppercase lg:hidden'>
									K-WD
								</span>
								{/* <!-- Toggle sidebar button --> */}
								<button
									onClick={() => setIsSidebarOpen(true)}
									className='p-2 rounded-md focus:outline-none focus:ring'>
									<svg
										className={
											'w-4 h-4 text-gray-600' &&
											`${
												'transform transition-transform -rotate-180' &&
												isSidebarOpen
											}`
										}
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M13 5l7 7-7 7M5 5l7 7-7 7'
										/>
									</svg>
								</button>
							</div>

							{/* <!-- Desktop search box --> */}
							<div className='items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5'>
								{/* <!-- search icon --> */}
								<span>
									<svg
										className='w-5 h-5 text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
										/>
									</svg>
								</span>
								<input
									type='text'
									placeholder='Search'
									className='px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border'
								/>
							</div>

							{/* <!-- Navbar right --> */}
							<div className='relative flex items-center space-x-3'>
								{/* <!-- Search button --> */}
								<button
									// @click="isSearchBoxOpen = true"
									className='p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring hover:bg-gray-200'>
									<svg
										className='w-6 h-6 text-gray-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
										/>
									</svg>
								</button>

								<div className='items-center hidden space-x-3 md:flex'>
									{/* <!-- Notification Button --> */}
									<div className='relative' x-data='{ isOpen: false }'>
										{/* <!-- red dot --> */}
										<div className='absolute right-0 p-1 bg-red-400 rounded-full animate-ping'></div>
										<div className='absolute right-0 p-1 bg-red-400 border rounded-full'></div>
										<button
											// @click="isOpen = !isOpen"
											className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
											<svg
												className='w-6 h-6 text-gray-500'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													stroke-width='2'
													d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
												/>
											</svg>
										</button>

										{/* <!-- Dropdown card --> */}
										<div
											// @click.away="isOpen = false"
											// x-show.transition.opacity="isOpen"
											className='absolute w-48 max-w-md mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max'>
											<div className='p-4 font-medium border-b'>
												<span className='text-gray-800'>Notification</span>
											</div>
											<ul className='flex flex-col p-2 my-2 space-y-1'>
												<li>
													<a
														href='#'
														className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
														Link
													</a>
												</li>
												<li>
													<a
														href='#'
														className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
														Another Link
													</a>
												</li>
											</ul>
											<div className='flex items-center justify-center p-4 text-blue-700 underline border-t'>
												<a href='#'>See All</a>
											</div>
										</div>
									</div>

									{/* <!-- Services Button --> */}
									<div x-data='{ isOpen: false }'>
										<button
											// @click="isOpen = !isOpen"
											className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
											<svg
												className='w-6 h-6 text-gray-500'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													stroke-width='2'
													d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
												/>
											</svg>
										</button>

										{/* <!-- Dropdown --> */}
										<div
											// @click.away="isOpen = false"
											// @keydown.escape="isOpen = false"
											// x-show.transition.opacity="isOpen"
											className='absolute mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max'>
											<div className='p-4 text-lg font-medium border-b'>
												Web apps & services
											</div>
											<ul className='flex flex-col p-2 my-3 space-y-3'>
												<li>
													<a
														href='#'
														className='flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100'>
														<span className='block mt-1'>
															<svg
																className='w-6 h-6 text-gray-500'
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																stroke='currentColor'>
																<path
																	fill='#fff'
																	d='M12 14l9-5-9-5-9 5 9 5z'
																/>
																<path
																	fill='#fff'
																	d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
																/>
																<path
																	stroke-linecap='round'
																	stroke-linejoin='round'
																	stroke-width='2'
																	d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
																/>
															</svg>
														</span>
														<span className='flex flex-col'>
															<span className='text-lg'>
																Atlassian
															</span>
															<span className='text-sm text-gray-400'>
																Lorem ipsum dolor sit.
															</span>
														</span>
													</a>
												</li>
												<li>
													<a
														href='#'
														className='flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100'>
														<span className='block mt-1'>
															<svg
																className='w-6 h-6 text-gray-500'
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																stroke='currentColor'>
																<path
																	stroke-linecap='round'
																	stroke-linejoin='round'
																	stroke-width='2'
																	d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
																/>
															</svg>
														</span>
														<span className='flex flex-col'>
															<span className='text-lg'>Slack</span>
															<span className='text-sm text-gray-400'>
																Lorem ipsum, dolor sit amet
																consectetur adipisicing elit.
															</span>
														</span>
													</a>
												</li>
											</ul>
											<div className='flex items-center justify-center p-4 text-blue-700 underline border-t'>
												<a href='#'>Show all apps</a>
											</div>
										</div>
									</div>

									{/* <!-- Options Button --> */}
									<div className='relative' x-data='{ isOpen: false }'>
										<button
											// @click="isOpen = !isOpen"
											className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
											<svg
												className='w-6 h-6 text-gray-500'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													stroke-width='2'
													d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
												/>
											</svg>
										</button>

										{/* <!-- Dropdown card --> */}
										<div
											// @click.away="isOpen = false"
											// x-show.transition.opacity="isOpen"
											className='absolute w-40 max-w-sm mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max'>
											<div className='p-4 font-medium border-b'>
												<span className='text-gray-800'>Options</span>
											</div>
											<ul className='flex flex-col p-2 my-2 space-y-1'>
												<li>
													<a
														href='#'
														className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
														Link
													</a>
												</li>
												<li>
													<a
														href='#'
														className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
														Another Link
													</a>
												</li>
											</ul>
											<div className='flex items-center justify-center p-4 text-blue-700 underline border-t'>
												<a href='#'>See All</a>
											</div>
										</div>
									</div>
								</div>

								{/* <!-- avatar button --> */}
								<div className='relative' x-data='{ isOpen: false }'>
									{/* <button @click="isOpen = !isOpen" className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"> */}
									<button className='p-1 bg-gray-200 rounded-full focus:outline-none focus:ring'>
										<img
											className='object-cover w-8 h-8 rounded-full'
											src='https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4'
											alt='Ahmed Kamel'
										/>
									</button>
									{/* <!-- green dot --> */}
									<div className='absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping'></div>
									<div className='absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3'></div>

									{/* <!-- Dropdown card --> */}
									<div
										//   @click.away="isOpen = false"
										//   x-show.transition.opacity="isOpen"
										className='absolute mt-3 transform -translate-x-full bg-white rounded-md shadow-lg min-w-max'>
										<div className='flex flex-col p-4 space-y-1 font-medium border-b'>
											<span className='text-gray-800'>Ahmed Kamel</span>
											<span className='text-sm text-gray-400'>
												ahmed.kamel@example.com
											</span>
										</div>
										<ul className='flex flex-col p-2 my-2 space-y-1'>
											<li>
												<a
													href='#'
													className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
													Link
												</a>
											</li>
											<li>
												<a
													href='#'
													className='block px-2 py-1 transition rounded-md hover:bg-gray-100'>
													Another Link
												</a>
											</li>
										</ul>
										<div className='flex items-center justify-center p-4 text-blue-700 underline border-t'>
											<a href='#'>Logout</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
					{/* <!-- Main content --> */}
					<main className='flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll'>
						{/* <!-- Main content header --> */}
                                    
						{/* <!-- Start Content --> */}
                                            {children}
						{/* <!-- Table see (https://tailwindui.com/components/application-ui/lists/tables) --> */}
						<h3 className='mt-6 text-xl'>Users</h3>
					</main>
					{/* <!-- Main footer --> */}
					<footer className='flex items-center justify-between flex-shrink-0 p-4 border-t max-h-14'>
						<div>AWESOME PEOPLE - 2023</div>
					</footer>
				</div>

				{/* <!-- Setting panel button --> */}
				<div>
					<button
						//   @click="isSettingsPanelOpen = true"
						className='fixed right-0 px-4 py-2 text-sm font-medium text-white uppercase transform rotate-90 translate-x-8 bg-gray-600 top-1/2 rounded-b-md'>
						Settings
					</button>
				</div>
			</div>
		</div>
	);
}
