def determine_lane(midpoint, frame_width):
    lane_width = frame_width // 4
    if midpoint < lane_width:
        return "lane1"
    elif midpoint < lane_width * 2:
        return "lane2"
    elif midpoint < lane_width * 3:
        return "lane3"
    else:
        return "lane4"
